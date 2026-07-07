import Image from "next/image";

const Testimonial = () => {
    return (
        <section className="relative w-full overflow-hidden">
            <div className="mx-auto w-full max-w-[1920px]">
                <div className="relative bg-background h-screen flex flex-col justify-center items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
                    <div
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-3 bg-primary"
                    />

                    <div className="mx-auto flex max-w-xl flex-col items-center gap-8 text-center">
                        <div className="relative size-40 shrink-0 overflow-hidden rounded-full">
                            <Image
                                src="/assets/student.jpg"
                                alt="Smiling student holding notebooks"
                                fill
                                sizes="160px"
                                className="object-cover object-center"
                            />
                        </div>

                        <blockquote className="font-heading tracking-tight text-foreground text-3xl">
                            &ldquo;DOTLES gave me the clarity and confidence I needed — from
                            choosing the right program to preparing for my entrance exams with
                            purpose.&rdquo;
                        </blockquote>

                        <div className="flex flex-col items-center">
                            <p className="text-lg font-medium text-foreground">Amara K.</p>
                            <p className="text-sm text-muted-foreground sm:text-base">
                                University Applicant
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
