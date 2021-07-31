import { Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "risAzonositoConverter"
})
export class RISAzonositoConverterPipe implements PipeTransform {

    transform(value: string) {
        if (value) {
            let prefix = value.slice(0,2);
            let suffix = value.slice(3);
            return `${prefix} ${suffix}`;
        }
        return;
    }
}