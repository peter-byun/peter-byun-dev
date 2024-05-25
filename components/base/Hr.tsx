import './Hr.css';

export function Hr({ margin }: { margin: string }) {
  return (
    <hr
      className="hr"
      style={{
        margin: margin ?? 0,
      }}
    ></hr>
  );
}
