import { prop, required } from '@rxweb/reactive-form-validators';

export class TestFormModel {
  @prop()
    name = '';

  @prop()
    password = '';

  @required({ message: 'نمایش خطا' })
    radio1 = '';

  @prop()
    radio2 = '';

  @required({ message: 'نمایش خطا' })
    checkBox1: string[] = [];

  @prop()
    checkBox2: string[] = [];

  @prop()
    imgUrl!: string;

  @required({ message: 'نمایش خطا' })
    select1: string[] = [];

  @required({ message: 'نمایش خطا' })
    select2 = '';

  @prop()
    autoOne!: string;

  @prop()
    autoTwo!: string;

  @prop()
    dateOneStart!: string;
  @prop()
    dateOneEnd!: string;

  @prop()
    dateTwo!: string;
}
