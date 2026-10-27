import { useId } from 'react';
import './FormField.css';

/**
 * Labelled input / textarea / select with inline error messaging.
 * Pass `as="textarea"` or `as="select"` (with `options`) to switch control.
 */
export default function FormField({ label, name, as = 'input', error, required, options = [], hint, showOptional = true, className = '', ...rest }) {
  const id = useId();
  const errorId = `${id}-error`;
  const Control = as;
  const common = {
    id,
    name,
    required,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: 'field__control',
    ...rest,
  };

  return (
    <div className={`field ${error ? 'field--error' : ''} ${className}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {required ? <span className="field__req" aria-hidden="true"> *</span> : showOptional && <span className="field__opt"> (optional)</span>}
      </label>
      {as === 'select' ? (
        <div className="field__select-wrap">
          <select {...common}>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ) : (
        <Control {...common} />
      )}
      {error ? (
        <p id={errorId} className="field__error" role="alert">{error}</p>
      ) : (
        hint && <p className="field__hint">{hint}</p>
      )}
    </div>
  );
}
