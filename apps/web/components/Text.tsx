import Link from "next/link";
import { HTMLProps, ReactElement } from "react";
import React from "react";
import { UrlProps } from "../types";

export const H1 = (props: HTMLProps<HTMLHeadingElement>): ReactElement => {
  return (
    <h1
      className="block text-2xl leading-8 font-bold tracking-tight md:text-3xl"
      {...props}
    />
  );
};

export const H2 = (props: HTMLProps<HTMLHeadingElement>): ReactElement => {
  return (
    <h2
      className="block text-2xl leading-8 font-extrabold tracking-tight  sm:text-4xl"
      {...props}
    />
  );
};

export const H3 = (props: HTMLProps<HTMLHeadingElement>): ReactElement => {
  return (
    <h3
      className="block leading-8 font-extrabold tracking-tight sm:text-3xl"
      {...props}
    />
  );
};

export const Title = (props: HTMLProps<HTMLHeadingElement>): ReactElement => {
  return (
    <h4
      className="block text-3xl text-center leading-8 font-extrabold tracking-tight  sm:text-4xl"
      {...props}
    />
  );
};

export const Text = (props: HTMLProps<HTMLParagraphElement>): ReactElement => {
  return <p className="text-base leading-normal" {...props} />;
};

export const Url = ({ text, ...props }: UrlProps): ReactElement => {
  return (
    <Link
      passHref
      target="_blank"
      className="cursor-pointer underline text-base leading-normal"
      {...props}
    >
      {text}
    </Link>
  );
};
