type BandnameProps = {
  className?: string;
};

export default function Bandname({ className }: BandnameProps) {
  return (
   <h1 className={`font-streetcred uppercase tracking-[0.5rem] ${className || 'text-6xl'}`}>Party Punch</h1>
  );
}
