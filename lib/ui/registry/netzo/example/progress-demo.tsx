import { Progress } from "netzo/ui/registry/netzo/ui/progress.tsx";
import { useEffect, useState } from "../../../deps.ts";

export default function ProgressDemo() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-[60%]" />;
}
