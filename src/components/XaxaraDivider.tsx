import Image from "next/image";

export default function XaxaraDivider() {
  return (
    <div className="flex items-center justify-center py-10 md:py-14" aria-hidden="true">
      <span className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-secondary/40" />
      <Image
        src="/assets/images/icon-xaxara-divider.png"
        alt=""
        width={150}
        height={150}
        className="xaxara-divider mx-4 cursor-pointer select-none"
        style={{ width: "auto", height: "auto" }}
      />
      <span className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent to-secondary/40" />
    </div>
  );
}
