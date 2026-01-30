// Temporary local type shim for react-router-dom to silence TS2307 until dependencies are installed.
// Remove this file after installing @types/react-router-dom (if needed) or after `react-router-dom` provides built-in types.

declare module "react-router-dom" {
  import type { ComponentType } from "react";
  export const BrowserRouter: ComponentType<any>;
  export const Outlet: ComponentType<any>;
  export const Route: ComponentType<any>;
  export const Routes: ComponentType<any>;
  export const Link: ComponentType<any>;
  export const NavLink: ComponentType<any>;
  export function useNavigate(): (to: any) => void;
  export function useParams(): Record<string, any>;
  export function useLocation(): { pathname: string };
  export function useSearchParams(): [URLSearchParams, (p?: any) => void];
}
