import mongoose, { connect } from "mongoose";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

// const sequelize = new Sequelize("sql2392387", "sql2392387", "Oluwanifesi123", {
//   host: "localhost",
//   dialect: "mysql",
//   define: {
//     timestamps: false,
//   },
// });

const sequelize = new Sequelize("sql2392387", "sql2392387", "bN3%jI7*", {
  host: "sql2.freemysqlhosting.net",
  port: 3306,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

interface PostBody {
  title?: string;
  message?: string;
  creator?: string;
  tags?: string | string[];
  selectedFile?: string;
  likeCount?:
    | {
        type: number;
        default?: 0;
      }
    | number
    | string;
  createdAt?:
    | {
        type: Date;
        default?: Date;
      }
    | Date;
}

export default class PostMessage extends Model {
  public id!: number;
  public title!: string;
  public creator!: string;
  public message!: string;
  public tags!: string;
  public selectedFile!: string;
  public likeCount!: number;
  public readonly createdDate!: Date;

  static async checkIsValidAndDelete(id: number | string) {
    try {
      const res = await this.findByPk(id);
      if (res) {
        await res.destroy();
      }
    } catch (error) {
      throw error;
    }
  }

  static async checkIsvalidAndUpdate(
    key: number | string,
    values?: PostBody
  ): Promise<PostMessage | undefined> {
    try {
      const res = await this.findByPk(key);
      if (res) {
        if (values) {
          const result = await res.update(values);
          return result;
        }
        return res;
      }
    } catch (e) {
      throw e;
    }
  }
  static async checkIsValidAndUpdateLike(id: number | string) {
    try {
      const res = await this.findByPk(id);
      if (res) {
        const result = await res.update({ likeCount: res.likeCount + 1 });
        return result;
      }
    } catch (e) {
      throw e;
    }
  }
}

(async () => {
  var q = sequelize.getQueryInterface();
  q.createTable("postmessages", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(5000),
      allowNull: false,
    },
    creator: {
      type: new DataTypes.STRING(1000),
      allowNull: false,
    },
    message: {
      type: new DataTypes.TEXT("long"),
      allowNull: false,
    },
    tags: {
      type: new DataTypes.STRING(5000),
      allowNull: false,
    },
    selectedFile: {
      type: new DataTypes.TEXT("long"),
      allowNull: false,
    },
    likeCount: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 0,
    },
    createdDate: {
      type: new DataTypes.DATE(),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
})();

PostMessage.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(5000),
      allowNull: false,
    },
    creator: {
      type: new DataTypes.STRING(1000),
      allowNull: false,
    },
    message: {
      type: new DataTypes.TEXT("long"),
      allowNull: false,
    },
    tags: {
      type: new DataTypes.STRING(5000),
      allowNull: false,
    },
    selectedFile: {
      type: new DataTypes.TEXT("long"),
      allowNull: false,
    },
    likeCount: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 0,
    },
    createdDate: {
      type: new DataTypes.DATE(),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "postmessages" }
);
