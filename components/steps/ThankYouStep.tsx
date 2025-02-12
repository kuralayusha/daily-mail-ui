export default function ThankYouStep() {
  return (
    <div className="text-center space-y-4 sm:space-y-6">
      <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🎉</div>
      <h1 className="text-2xl sm:text-3xl font-bold">
        Thank You for Subscribing!
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
        Your daily newsletter will be delivered to your inbox every day. You can
        always update your preferences by clicking the link in the newsletter.
      </p>
      <div className="p-3 sm:p-4 bg-card rounded-lg border border-border mt-6 sm:mt-8">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Pro tip: Add{" "}
          <span className="font-mono text-foreground break-all">
            kuralayusha@gmail.com
          </span>{" "}
          to your contacts to ensure our emails don't end up in spam.
        </p>
      </div>
    </div>
  );
}
