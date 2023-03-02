import { LinkProps } from "next/link";

export type ButtonVariant = "primary_blue" | "light" | "borderless";

export interface UrlProps extends LinkProps {
  text: string;
  className?: string;
}
