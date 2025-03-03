import KanbanBoard from "@/components/Board";
import Column from "@/components/Column";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-secondary w-screen md:max-w-[calc(100vw-20rem)] min-h-[calc(100vh-96px)] md:h-full flex gap-4 p-4  ">
      <KanbanBoard/>
    </div>
  );
}
