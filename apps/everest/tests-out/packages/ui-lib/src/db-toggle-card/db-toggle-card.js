import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import { DbType } from '../../../types/src';
import { humanizeDbType } from './db-toggle-card.utils';
import ToggleCard from '../toggle-card';
import { MongoIcon, MySqlIcon, PostgreSqlIcon } from '../icons';
const iconMap = {
    [DbType.Postresql]: PostgreSqlIcon,
    [DbType.Mongo]: MongoIcon,
    [DbType.Mysql]: MySqlIcon,
};
const DbIcon = ({ type }) => {
    const commonProps = {
        fontSize: 'medium',
        sx: { mr: 1 },
    };
    const MappedIcon = iconMap[type];
    return _jsx(MappedIcon, { ...commonProps });
};
const DbToggleCard = (props) => {
    const { value } = props;
    return (_jsxs(ToggleCard, { ...props, "data-testid": `${value}-toggle-button`, children: [_jsx(DbIcon, { type: value }), _jsx(Typography, { variant: "body1", children: humanizeDbType(value) })] }));
};
export default DbToggleCard;
//# sourceMappingURL=db-toggle-card.js.map