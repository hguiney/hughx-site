// https://blog.logrocket.com/validating-react-component-props-with-prop-types-ef14b29963fc/
export default function isNumeric( value ) {
  const regex = /^(\+|-)?((\d*\.?\d+)|(\d+\.?\d*))$/;
  return Number.isFinite( value ) || ( ( typeof value === "string" ) && regex.test( value ) );
}
