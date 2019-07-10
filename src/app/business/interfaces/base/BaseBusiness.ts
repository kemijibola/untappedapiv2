import Read from './../common/Read';
import Write from './../common/Write';

interface BaseBusiness<T> extends Read<T>, Write<T> {}
export = BaseBusiness;
