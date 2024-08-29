import s from './ImpressionBox.module.css';

function ImpressionBox({ impression, text }) {
  return (
    <div className={s.container}>
      <h2>{impression}</h2>
      <p>{text}</p>
    </div>
  );
}

export default ImpressionBox;
