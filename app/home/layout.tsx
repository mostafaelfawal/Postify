import { ReactNode } from "react";
import Header from "./components/Header/Header";

export default function Homelayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
