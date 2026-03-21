import { useCountdown } from '../hooks/useCountdown';

interface Props {
  expirationTime: string;
}

export function CountdownTimer({ expirationTime }: Props) {
  const { hours, minutes, seconds, isExpired } = useCountdown(expirationTime);

  if (isExpired) {
    return <span className="text-red-500 text-xs font-semibold">Expired</span>;
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-0.5 font-mono font-bold text-red-600 text-xs">
      <span className="bg-red-50 rounded px-1 py-0.5">{pad(hours)}</span>
      <span className="text-red-400">:</span>
      <span className="bg-red-50 rounded px-1 py-0.5">{pad(minutes)}</span>
      <span className="text-red-400">:</span>
      <span className="bg-red-50 rounded px-1 py-0.5">{pad(seconds)}</span>
    </div>
  );
}
