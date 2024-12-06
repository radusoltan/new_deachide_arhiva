export const TelegramPost = ({ postUrl }) => {
  return (
      <div>
        <iframe
            src={`https://t.me/${postUrl}?embed=1`}
            width="100%"
            height="500"
            allowtransparency="true"
            sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </div>
  );
};