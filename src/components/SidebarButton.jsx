import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const SidebarButton = ({ children, color, href }) => {
  const sidebar = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3",
    variants: {
      color: {
        unselected: "text-brand-dark-blue",
        selected: "bg-brand-primary bg-opacity-15 text-brand-primary",
      },
    },
  });

  return (
    <a href={href} className={sidebar({ color })}>
      {children}
    </a>
  );
};

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  // node: qualquer coisa que pode ser renderizada, como texto, número, elemento React, etc.
  color: PropTypes.oneOf(["unselected", "selected"]),
  // unselected: botão não selecionado, com cor de texto padrão
  // selected: botão selecionado, com fundo e texto destacados
};

export default SidebarButton;
