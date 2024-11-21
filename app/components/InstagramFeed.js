export default function InstagramFeed() {
    return (
      <div>
        <h2>Instagram Feed</h2>
        <iframe
          src="https://snapwidget.com/embed/your-widget-id"
          className="snapwidget-widget"
          allowTransparency="true"
          frameBorder="0"
          scrolling="no"
          style={{
            border: 'none',
            overflow: 'hidden',
            width: '100%',
            height: '500px',
          }}
        ></iframe>
        <style jsx>{`
          h2 {
            text-align: center;
            margin-bottom: 20px;
          }
        `}</style>
      </div>
    );
  }
  