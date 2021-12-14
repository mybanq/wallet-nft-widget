import React from "react";

interface Props
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	isLoading?: boolean;
	className?: string;
	error?: boolean;
}

export const LinkNftWalletButton = ({
	isLoading,
	disabled,
	error,
	className,
	...props
}: Props) => {
	return (
		<link-nft-banq-button
			{...props}
			class={className}
			disabled={disabled}
			error={error}
		/>
	);
};
