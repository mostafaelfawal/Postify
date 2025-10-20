import Header from "./components/Header";
import ProfilePosts from "./components/ProfilePosts";

export default function Profile() {
  return (
    <div className="dark:bg-darkly bg-bg dark:text-bg text-darkly min-h-screen">
      <Header />
      <ProfilePosts />
    </div>
  );
}
