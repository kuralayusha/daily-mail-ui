interface LandingStepProps {
  onStart: () => void;
}

export default function LandingStep({ onStart }: LandingStepProps) {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold">Daily Newsletter</h1>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        Get personalized daily updates about what matters to you. Choose your
        interests and receive a curated newsletter every day.
      </p>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="feature-card">
            <div className="icon">📰</div>
            <h3>News</h3>
            <p>Daily updates from various sources</p>
          </div>
          <div className="feature-card">
            <div className="icon">🎯</div>
            <h3>Personalized</h3>
            <p>Choose what interests you</p>
          </div>
          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Fast</h3>
            <p>Quick and easy setup</p>
          </div>
        </div>
      </div>
      <button onClick={onStart} className="button mt-8 px-12">
        Get Started
      </button>
    </div>
  );
}
