interface StepHeaderProps {
  step: number;
  title: string;
  variant?: 'default' | 'success';
}

export default function StepHeader({ step, title, variant = 'default' }: StepHeaderProps) {
  const bgColor = variant === 'success' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className="flex items-center gap-2 mb-4 px-4 pt-4">
      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${bgColor} text-white font-bold`}>
        {step}
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}
