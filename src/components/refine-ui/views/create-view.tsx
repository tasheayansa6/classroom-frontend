"use client";

import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  useBack,
  useResourceParams,
  useUserFriendlyName,
} from "@refinedev/core";
import { ArrowLeftIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

import { Loader2, Save } from "lucide-react";
import React from "react";

type CreateViewProps = PropsWithChildren<{
    className?: string;
    isLoading?: boolean;
    saveButtonProps?: {
        disabled?: boolean;
        onClick?: (e: React.BaseSyntheticEvent) => void;
    };
}>;

export function CreateView({ children, className, saveButtonProps, isLoading }: CreateViewProps) {
    return (
        <div className={cn("flex flex-col", "gap-4", className)}>
            {children}
            <div className="flex items-center justify-end mt-4">
                <Button
                    {...saveButtonProps}
                    disabled={isLoading || saveButtonProps?.disabled}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    <span className="ml-2">Save</span>
                </Button>
            </div>
        </div>
    );
}

type CreateHeaderProps = PropsWithChildren<{
  resource?: string;
  title?: string;
  wrapperClassName?: string;
  headerClassName?: string;
}>;

export const CreateViewHeader = ({
  resource: resourceFromProps,
  title: titleFromProps,
  wrapperClassName,
  headerClassName,
}: CreateHeaderProps) => {
  const back = useBack();

  const getUserFriendlyName = useUserFriendlyName();

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProps,
  });

  const title =
    titleFromProps ??
    getUserFriendlyName(
      resource?.meta?.label ?? identifier ?? resource?.name,
      "plural"
    );

  return (
    <div className={cn("flex flex-col", "gap-4", wrapperClassName)}>
      <div className="flex items-center relative gap-2">
        <div className="bg-background z-[2] pr-4">
          <Breadcrumb />
        </div>
        <Separator className={cn("absolute", "left-0", "right-0", "z-[1]")} />
      </div>
      <div
        className={cn(
          "flex",
          "gap-1",
          "items-center",
          "-ml-2.5",
          headerClassName
        )}
      >
        <Button variant="ghost" size="icon" onClick={back}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </div>
  );
};

CreateView.displayName = "CreateView";
