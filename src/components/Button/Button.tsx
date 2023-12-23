import { MouseEventHandler } from "react";

type ButtonProps = {
    type: "submit" | "reset" | "button";
    isSubmitting?: boolean;
    classes?: string;
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}


function Button({ type, isSubmitting, classes, text, onClick}: ButtonProps) {
    return (
        <button type={type} disabled={isSubmitting} className={classes} onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;