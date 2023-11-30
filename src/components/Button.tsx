const Button = ({ children, onClick } : ButtonProps) => {
    return (
        <div>
            <button type="submit" onClick={onClick} className="button">
                {children}
            </button>
        </div>
    );
};

export default Button;