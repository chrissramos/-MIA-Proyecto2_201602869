const oracledb = require('oracledb');

Datos = {
    user: 'usradmin',
    password: '1234',
    "connectString": "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"

    // connectString: '172.17.0.2:1521/ORCL18' 
}

async function Connection(sql, binds, autoCommit) {
    let open = await oracledb.getConnection(Datos);
    let consulta = await open.execute(sql, binds, { autoCommit });
    open.release();
    return consulta;
}

exports.Connection = Connection;