import { Hero } from "@/components/Hero";
import { LogoCloud } from "@/components/LogoCloud";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { Faqs } from "@/components/Faqs";
import { Donate } from "@/components/Donate";
import { TestComponent } from "@clawesome/ui";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      {/* <TestComponent /> */}
      <LogoCloud />
      <Features />
      <Testimonials />
      <Faqs />
      <Donate />
    </div>
  );
}
