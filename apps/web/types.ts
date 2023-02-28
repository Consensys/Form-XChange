import { LinkProps } from "next/link";

export type ButtonVariant = "primrary_blue" | "light" | "borderless";

export interface UrlProps extends LinkProps {
  text: string;
}
