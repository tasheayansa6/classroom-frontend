import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { Trash, UploadCloud, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { UploadWidgetProps, UploadWidgetValue } from "@/types";

function UploadWidget({
                          value = null,
                          onChange,
                          disabled = false,
                      }: UploadWidgetProps) {
    const widgetRef = useRef<any>(null);
    const [preview, setPreview] = useState<UploadWidgetValue | null>(value);
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        setPreview(value);
    }, [value]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const initializeWidget = () => {
            // Check if the script we added to index.html is loaded
            if (!(window as any).cloudinary) return false;

            if (!widgetRef.current) {
                widgetRef.current = (window as any).cloudinary.createUploadWidget(
                    {
                        cloudName: CLOUDINARY_CLOUD_NAME,
                        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
                        multiple: false,
                        folder: "classes",
                        clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
                    },
                    (error: any, result: any) => {
                        if (!error && result && result.event === "success") {
                            const payload = {
                                url: result.info.secure_url,
                                publicId: result.info.public_id,
                            };
                            setPreview(payload);
                            onChange?.(payload);
                        }
                    }
                );
            }
            return true;
        };

        // Retry initialization if script isn't ready yet
        const intervalId = setInterval(() => {
            if (initializeWidget()) {
                clearInterval(intervalId);
            }
        }, 500);

        return () => clearInterval(intervalId);
    }, [onChange]);

    const openWidget = () => {
        if (!disabled && widgetRef.current) {
            widgetRef.current.open();
        } else if (!(window as any).cloudinary) {
            console.error("Cloudinary script not found in index.html");
        }
    };

    return (
        <div className="space-y-2">
            {preview?.url ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <img src={preview.url} alt="Preview" className="h-full w-full object-cover" />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => {
                            setPreview(null);
                            onChange?.(null);
                        }}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div
                    onClick={openWidget}
                    className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted/80"
                >
                    <UploadCloud className="h-8 w-8 text-orange-600" />
                    <div className="text-center text-sm">
                        <p className="font-medium">Click to upload banner</p>
                        <p className="text-muted-foreground text-xs">PNG or JPG (Max 5MB)</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UploadWidget;