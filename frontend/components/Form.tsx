import { UseFormRegister, FieldErrors, Control, Controller } from 'react-hook-form';
import DateTimePicker from './DateTimePicker';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  required?: boolean;
  placeholder?: string;
}

export const Input = ({ 
  label, 
  name, 
  type = 'text', 
  register, 
  errors, 
  required = false,
  placeholder 
}: InputProps) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-semibold text-slate-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, { required: required ? `${label} is required` : false })}
        className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300 hover:bg-white/80 hover:shadow-md"
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-500 font-medium">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};

interface TextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export const Textarea = ({ 
  label, 
  name, 
  register, 
  errors, 
  required = false,
  placeholder,
  rows = 4
}: TextareaProps) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-semibold text-slate-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name, { required: required ? `${label} is required` : false })}
        className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300 hover:bg-white/80 hover:shadow-md resize-none"
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-500 font-medium">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

interface DateTimeInputProps {
  label: string;
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  required?: boolean;
}

export const DateTimeInput = ({ 
  label, 
  name, 
  control, 
  errors, 
  required = false 
}: DateTimeInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field: { onChange, value } }) => (
        <DateTimePicker
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          error={errors[name]?.message as string}
          required={required}
        />
      )}
    />
  );
};

export const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  onClick, 
  disabled = false,
  className = ''
}: ButtonProps) => {
  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5';
  
  const variantClasses = {
    primary: 'bg-primary/90 text-white hover:bg-primary focus:ring-primary/30 shadow-primary/20 hover:shadow-primary/30',
    secondary: 'bg-white/80 text-primary border border-primary/30 hover:bg-white/90 hover:border-primary/50 focus:ring-primary/30 shadow-slate-200/50',
    danger: 'bg-red-500/90 text-white hover:bg-red-600 focus:ring-red-500/30 shadow-red-200/50 hover:shadow-red-300/50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed transform-none hover:transform-none hover:shadow-lg' : ''} ${className}`}
    >
      {children}
    </button>
  );
};