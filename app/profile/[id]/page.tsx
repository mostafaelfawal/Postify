type Prop = {
  params: { id: string };
};

export default function Profile({ params }: Prop) {
  return <p>{params.id}</p>;
}
