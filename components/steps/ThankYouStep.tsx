interface ThankYouStepProps {
  unsubscribed?: boolean;
}

export default function ThankYouStep({ unsubscribed }: ThankYouStepProps) {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold">
        {unsubscribed
          ? "We're Sad to See You Go!"
          : "Thank You for Subscribing!"}
      </h2>
      <p className="text-muted-foreground">
        {unsubscribed
          ? "We'll miss sharing our daily discoveries with you. Remember, our door is always open if you'd like to return – we'd be delighted to have you back!"
          : "We're excited to start sharing interesting content with you."}
      </p>
      <div className="p-3 sm:p-4 bg-card rounded-lg border border-border mt-6 sm:mt-8">
        {!unsubscribed && (
          <p className="text-xs sm:text-sm text-muted-foreground">
            Pro tip: Add{" "}
            <span className="font-mono text-foreground break-all">
              kuralayusha@gmail.com
            </span>{" "}
            to your contacts to ensure our emails don't end up in spam.
          </p>
        )}
      </div>
    </div>
  );
}
