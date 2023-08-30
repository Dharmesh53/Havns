import '@styles/loading.css';

const Loading = (color) => {
  return (
    <div className="flex justify-center">
      <span className={`loader border-${color}-500`}></span>
    </div>
  );
}

export default Loading
