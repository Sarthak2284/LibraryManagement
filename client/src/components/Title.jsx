function Title({ text, icon = "📚", align = "center" }) {
    const alignment = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  
    return (
      <h2 className={`text-3xl font-bold text-gray-800 mb-8 ${alignment}`}>
        {icon} {text}
      </h2>
    );
  }
  
  export default Title;
  