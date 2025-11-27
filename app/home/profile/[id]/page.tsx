import Header from "./components/Header";
import ProfilePosts from "./components/ProfilePosts";

type ProfileProps = {
  params: { id: string };
};

export default function Profile({ params }: ProfileProps) {
  return (
    <div className="dark:bg-darkly bg-bg dark:text-bg text-darkly min-h-screen">
      <Header id={params.id} />
      <ProfilePosts id={params.id} />
    </div>
  );
}
