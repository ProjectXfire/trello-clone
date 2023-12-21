interface Props {
  data: Array<{ id: string; title: string }>;
}

function Boards({ data }: Props): JSX.Element {
  return (
    <section>
      {data.map((board) => (
        <div key={board.id}>{board.title}</div>
      ))}
    </section>
  );
}
export default Boards;
