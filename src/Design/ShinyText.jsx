const ShinyText = ({ 
  text, 
  children, 
  disabled = false, 
  speed = 5, 
  className = '' 
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
  backgroundImage:
    "linear-gradient(120deg, rgba(255,255,255,0) 35%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 65%)",
  backgroundSize: "200% 100%",
  WebkitBackgroundClip: "text",
  animationDuration,
}}



    >
      {children || text}
    </div>
  );
};

export default ShinyText;
