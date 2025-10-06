type Prop = {
  params: { id: string };
};

export default function Post({ params }: Prop) {
  return <p>{params.id}</p>;
}
