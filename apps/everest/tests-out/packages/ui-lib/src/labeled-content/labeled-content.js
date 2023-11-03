import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Typography } from '@mui/material';
const LabeledContent = ({ label, children, isRequired = false, sx, ...typographyProps }) => (_jsxs(_Fragment, { children: [_jsxs(Typography
        // @ts-ignore
        , { 
            // @ts-ignore
            variant: "sectionHeading", sx: { mt: 4, mb: 0.5, ...sx }, ...typographyProps, children: [label, isRequired && _jsx("span", { children: "*" })] }), children] }));
export default LabeledContent;
//# sourceMappingURL=labeled-content.js.map