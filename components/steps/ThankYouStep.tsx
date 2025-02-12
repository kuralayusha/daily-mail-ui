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
          : "We're excited to start sharing interesting content with you. Check your inbox tomorrow for your first daily digest!"}
      </p>
    </div>
  );
}
