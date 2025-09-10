export default function Input({ name, placeholder, handleInput }) {
  return (
    <div>
      <input placeholder={placeholder} name={name} onChange={handleInput}  />
      
    </div>
  );
}
