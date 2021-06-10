import { BookValidator } from "../BookValidator";
import {FormBuilder, FormControl, FormGroup, ValidationErrors} from "@angular/forms";

describe('Book Validator üzenetek', () => {

    it('title is correct, should return no error message', () => {
        let control = new FormControl('React');
        let valasz = BookValidator.titleFormat(control);
        expect(valasz).toBeNull();
    });

    it('title should return validation error message: error.book_title', () => {
        let control = new FormControl('valami');
        let valasz = BookValidator.titleFormat(control);
        let expected = {title: {message: "error.book_title"}};
        expect(valasz).toEqual(expected);
    });

    it('Age and year are correct, should return no error message', () => {
        let fb = new FormBuilder();
        let fgroup = fb.group({
            age: [49],
            birthYear: [1972]
        });
        let valasz = BookValidator.ageAndYearCorrect(fgroup);
        expect(valasz).toBeNull();
    });

    it('Age and year are not correct,', () => {
        let fb = new FormBuilder();
        let fgroup = fb.group({
            age: [40],
            birthYear: [1972]
        });
        let valasz = BookValidator.ageAndYearCorrect(fgroup);
        let expected = {ageAndYear: {message: "error.book_age"}};
        expect(valasz).toEqual(expected);
    });

});