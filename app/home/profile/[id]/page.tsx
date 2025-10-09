import Header from "./components/Header";

type Prop = {
  params: { id: string };
};

export default function Post({ params }: Prop) {
  return (
    <>
      <Header />
    </>
  );
}
