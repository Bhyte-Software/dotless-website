"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconSend } from "@tabler/icons-react";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a bit more about how we can help."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function ContactField({
  id,
  label,
  hasValue,
  hasError,
  children,
}: {
  id: string;
  label: string;
  hasValue: boolean;
  hasError: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col -space-y-3 rounded-none px-3 pt-2.5 transition-[color,box-shadow,background-color] focus-within:border-primary focus-within:bg-secondary/20 focus-within:ring-2 focus-within:ring-primary/20",
        hasValue ? "bg-secondary/25" : "bg-transparent",
        hasError
          ? "border border-destructive bg-destructive/5 ring-[3px] ring-destructive/20"
          : "border border-border"
      )}
    >
      <FieldLabel
        htmlFor={id}
        className={cn(
          "relative z-10 text-base transition-opacity",
          hasValue && "opacity-70"
        )}
      >
        {label}
      </FieldLabel>
      {children}
    </div>
  );
}

const inputClassName =
  "h-10 rounded-none border-none bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent focus-visible:border-none aria-invalid:border-none aria-invalid:ring-0";

const textareaClassName =
  "min-h-68 rounded-none border-none bg-transparent px-0 py-0 pt-3 shadow-none focus-visible:ring-0 dark:bg-transparent aria-invalid:border-none aria-invalid:ring-0";

const Contact = () => {
  const [isSent, setIsSent] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const nameValue = form.watch("name");
  const emailValue = form.watch("email");
  const messageValue = form.watch("message");

  const onSubmit = form.handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSent(true);
    form.reset();
  });

  return (
    <section id="contact-us" className="relative w-full overflow-hidden">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="grid min-h-screen grid-cols-1 border-x border-border lg:grid-cols-2">
          <div className="relative min-h-72 lg:min-h-full">
            <Image
              src="/assets/contact.jpg"
              alt="Student studying with focus and determination"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          <div className="flex items-center justify-center bg-secondary/10 px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
            <div className="w-full max-w-lg border border-border bg-background p-8 sm:p-10">
              <div className="mb-8 flex flex-col gap-2">
                <h2 className="font-heading text-3xl tracking-tight text-foreground">
                  Send Us a Message
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Ready to start your educational journey? Reach out and our team
                  will get back to you shortly.
                </p>
              </div>

              <form onSubmit={onSubmit} className="flex flex-col gap-8">
                <FieldGroup>
                  <Field data-invalid={!!form.formState.errors.name}>
                    <ContactField
                      id="name"
                      label="Name"
                      hasValue={nameValue.length > 0}
                      hasError={!!form.formState.errors.name}
                    >
                      <Input
                        id="name"
                        type="text"
                        placeholder="Full Name"
                        autoComplete="name"
                        aria-invalid={!!form.formState.errors.name}
                        disabled={form.formState.isSubmitting}
                        className={inputClassName}
                        {...form.register("name")}
                      />
                    </ContactField>
                    <FieldError errors={[form.formState.errors.name]} />
                  </Field>

                  <Field data-invalid={!!form.formState.errors.email}>
                    <ContactField
                      id="email"
                      label="Email"
                      hasValue={emailValue.length > 0}
                      hasError={!!form.formState.errors.email}
                    >
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        autoComplete="email"
                        aria-invalid={!!form.formState.errors.email}
                        disabled={form.formState.isSubmitting}
                        className={inputClassName}
                        {...form.register("email")}
                      />
                    </ContactField>
                    <FieldError errors={[form.formState.errors.email]} />
                  </Field>

                  <Field data-invalid={!!form.formState.errors.message}>
                    <ContactField
                      id="message"
                      label="Message"
                      hasValue={messageValue.length > 0}
                      hasError={!!form.formState.errors.message}
                    >
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        aria-invalid={!!form.formState.errors.message}
                        disabled={form.formState.isSubmitting}
                        className={textareaClassName}
                        {...form.register("message")}
                      />
                    </ContactField>
                    <FieldError errors={[form.formState.errors.message]} />
                  </Field>
                </FieldGroup>

                {isSent && (
                  <p className="text-sm text-foreground">
                    Thank you — your message has been sent. We&apos;ll be in
                    touch soon.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="h-12 w-full gap-2 text-sm font-medium"
                >
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  <IconSend className="size-4" aria-hidden />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
