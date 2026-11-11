import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Szabaly } from './Szabaly.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tuzfal',
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async GetDatabase() {
    const [data] = await mysqlConnection.execute(
      'SELECT id, priority, mac, enabled FROM blocklist'
    );
    const rows = data as Szabaly[];
    return rows;
  }

  async UjSzabaly(priority: string, mac: string, enabled: string) {

    const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    if (!regex.test(mac.trim())) {
      return {
        error: 'Hibás MAC cím formátum.',
      };
    }

    const enabledValue = enabled === 'on';
    const priorityValue = parseInt(priority.trim());

    const [results] = await mysqlConnection.execute(
      'INSERT INTO blocklist (priority, mac, enabled) VALUES (?, ?, ?)',
      [priorityValue, mac, enabledValue]
    );
    const rows = results as any;
    // return {
    //   id: rows.insertId,
    //   priority,
    //   mac,
    //   enabled,
    // } as Szabaly;
  }
}
