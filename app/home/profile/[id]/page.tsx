import Header from "./components/Header";
import PorfilePosts from "./components/PorfilePosts";

type Prop = {
  params: { id: string };
};

export default function Post({ params }: Prop) {
  return (
    <div className="dark:bg-darkly bg-bg dark:text-bg text-darkly">
      <Header />
      <PorfilePosts />
    </div>
  );
}
