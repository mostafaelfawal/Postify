import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/icon.png"
        alt="logo"
        width={45}
        height={45}
        className="rounded-full"
        priority
      />
      <h1 className="text-xl font-semibold">Postify</h1>
    </div>
  );
}
