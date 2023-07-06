const createHttpError = require("http-errors");
const { SliderModel } = require("../../../../models/sliders");
const { objectIdValidator } = require("../../../../validator/public.validator");

class SlidersController {
    async addSlider(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    async editSlider(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    async removeSlider(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    async getAllSlider(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    async getOneSliderById(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    async checkSliderExists(sliderID) {
        await objectIdValidator.validateAsync({ id: sliderID })
        const slider = await SliderModel.findById({ _id: sliderID });
        if (!slider) throw createHttpError.NotFound("اسلایدر ای یافت نشد");
        return slider;
    }
}

module.exports = {
    SlidersController: new SlidersController()
}