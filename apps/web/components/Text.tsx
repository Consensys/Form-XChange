import Link from "next/link";
import { HTMLProps, ReactElement } from "react";
import React from "react";
import { UrlProps } from "../types";
import { twMerge } from "tailwind-merge";

export const H1 = (props: HTMLProps<HTMLHeadingElement>): ReactElement => {
  const rootClassName = twMerge(
    "block text-2xl leading-8 font-bold tracking-tight md:text-3xl",
    props.className ? props.className : ""
  );

  return <h1 {...props} className={rootClassName} />;
};

export const H2 = (props: HTMLProps<HTMLHeadingElement>): ReactElement => {
  const rootClassName = twMerge(
    "block text-xl leading-8 font-extrabold tracking-tight md:text-2xl",
    props.className ? props.className : ""
  );

  return <h2 {...props} className={rootClassName} />;
};

export const H3 = (props: HTMLProps<HTMLHeadingElement>): ReactElement => {
  const rootClassName = twMerge(
    "block text-lg leading-8 font-bold tracking-tight md:text-xl",
    props.className ? props.className : ""
  );

  return <h3 {...props} className={rootClassName} />;
};

export const Title = (props: HTMLProps<HTMLHeadingElement>): ReactElement => {
  const rootClassName = twMerge(
    "block text-lg leading-8 font-extrabold tracking-tight md:text-xl",
    props.className ? props.className : ""
  );

  return <h4 {...props} className={rootClassName} />;
};

export const Text = (props: HTMLProps<HTMLParagraphElement>): ReactElement => {
  const rootClassName = twMerge(
    "text-primary-black",
    props.className ? props.className : ""
  );

  return <p {...props} className={rootClassName} />;
};

export const Url = ({ text, ...props }: UrlProps): ReactElement => {
  const rootClassName = twMerge(
    "cursor-pointer underline text-base leading-normal",
    props.className ? props.className : ""
  );

  return (
    <Link passHref target="_blank" {...props} className={rootClassName}>
      {text}
    </Link>
  );
};
